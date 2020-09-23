<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 司机管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-button type="primary" class="handle-del mr10" @click="Adddriver">添加司机</el-button>
                <el-select v-model="query.address" placeholder="手机号" class="handle-select mr10">
                    <el-option key="1" label="手机号" value="手机号"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="d_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="d_acc" label="账户"></el-table-column>
                <el-table-column prop="d_name" label="姓名"></el-table-column>
                <el-table-column prop="d_phone" label="手机号"></el-table-column>
                <el-table-column prop="d_IDnum" label="身份证号"></el-table-column>
                <el-table-column prop="d_score" label="评分"></el-table-column>
                <el-table-column prop="d_order" label="接单数"></el-table-column>
                <el-table-column prop="d_drive" label="驾驶证"></el-table-column>
                <el-table-column prop="d_driving" label="驾龄"></el-table-column>
                <el-table-column prop="d_state" label="状态" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >重置密码</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

<!--        &lt;!&ndash; 重置密码弹出框 &ndash;&gt;-->
<!--        <el-dialog title="重置密码" :visible.sync="editVisible" width="30%">-->
<!--            <el-form ref="form" :model="form" label-width="70px">-->
<!--                <el-form-item label="用户名">-->
<!--                    <el-input v-model="form.name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="地址">-->
<!--                    <el-input v-model="form.address"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="editVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="saveEdit">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->

        <!-- 增加司机弹出框 -->
        <el-dialog title="添加" :visible.sync="edble" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="账号">
                    <el-input v-model="Add.d_acc"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="Add.d_name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="Add.d_pwd"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="Add.d_phone"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                    <el-input v-model="Add.d_IDnum"></el-input>
                </el-form-item>
                <el-form-item label="驾驶证">
                    <el-input v-model="Add.d_drive"></el-input>
                </el-form-item>
                <el-form-item label="驾龄">
                    <el-input v-model="Add.d_driving"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="edble = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'DriverManagement',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 5,
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                edble:false,
                pageTotal: 0,
                form: {},
                Add:{
                    d_acc:'',
                    d_name:'',
                    d_phone:'',
                    d_IDnum:'',
                    d_drive:'',
                    d_driving:'',
                    d_pwd:''
                },
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData('admin/login/Driver');
        },
        methods: {
            // 获取司机信息
            getData(e) {
                this.$axios.post(e
                ).then(response=>{
                    console.log(response.data);
                    this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                    this.pageTotal =response.data.count;
                })
            },
            // 触发搜索按钮
            handleSearch() {
                if (this.query.address=='手机号'&&this.query.name!=''){
                    this.$axios.post(
                        'admin/login/Checkdriver',
                        {
                            d_phone:this.query.name
                        }
                    ).then(response=>{
                        console.log(response.data);
                        if (response.data.code=='30001'){
                            this.tableData=[];
                            this.tableData.push(response.data.arry);
                        }else {
                            alert(response.data.msg)
                        }

                    })
                }else{
                    this.getData('admin/login/Driver');
                }

            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios.post(
                            'admin/login/Deldriver',
                            {
                                d_id:this.tableData[index].d_id
                            }
                        ).then(response=>{
                            console.log(response.data);
                            if (response.data.code=='50001'){
                                this.$message.success('删除成功');
                                this.getData('admin/login/Driver');
                            }
                        })
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 批量删除
            delAllSelection() {
                // console.log(this.multipleSelection);
                this.$axios.post(
                    'admin/login/allDeldriver',
                    {
                        multipleSelection:this.multipleSelection
                    }
                ).then(response=>{
                    console.log(response.data)
                    this.$message.success(response.data.msg);
                    this.getData('admin/login/Driver');
                })
            },
            // 重置密码
            handleEdit(index, row) {
                // 二次确认删除
                this.$confirm('确定要重置密码吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios.post(
                            'admin/login/resetPassword',
                            {
                                d_id:this.tableData[index].d_id,
                                d_pwd:'123456'
                            }
                        ).then(response=>{
                            console.log(response.data);
                            if (response.data.code=='60001'){
                                this.$message.success('修改成功'+response.data.msg);
                                this.getData('admin/login/Driver');
                            }
                        })
                    })
                    .catch(() => {});
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            //添加操作
            Adddriver(){
                this.edble=true;
            },
            //保存添加
            saveAdd(){
                if (this.Add.d_acc!=''&&this.Add.d_drive!=''&&this.Add.d_driving!=''&&this.Add.d_IDnum!=''&&this.Add.d_name!=''&&this.Add.d_phone!=''&&this.Add.d_pwd!=''){
                    this.$axios.post(
                        'admin/login/Adddriver',
                        {
                            d_acc:this.Add.d_acc,
                            d_name:this.Add.d_name,
                            d_phone:this.Add.d_phone,
                            d_IDnum:this.Add.d_IDnum,
                            d_drive:this.Add.d_drive,
                            d_driving:this.Add.d_driving,
                            d_pwd:this.Add.d_pwd
                        }
                    ).then(response=>{
                        if (response.data.code=='40001'){
                            alert(response.data.msg);
                            this.edble = false;
                            this.getData('admin/login/Driver');
                        }else {
                            this.$message.error('添加失败');
                        }
                    })
                }else {
                    this.$message.error('不能有数据为空');
                }
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData('admin/login/Driver');
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
