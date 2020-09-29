<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 车辆类型管理管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="handle-del mr10" @click="AddType">添加车辆类型</el-button>
                <el-input v-model="query.di_name" placeholder="车辆类型" class="handle-input mr10"></el-input>
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
                <el-table-column prop="di_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="di_name" label="车辆类型" align="center"></el-table-column>
                <el-table-column label="操作" width="380" align="center">
                    <template slot-scope="scope">
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
        <!-- 增加车辆类型弹出框 -->
        <el-dialog title="编辑" :visible.sync="addnew" width="30%">
            <el-form :model="Add" :rules="rules" ref="add" label-width="70px">
                <el-form-item label="车辆类型" prop="di_name">
                    <el-input v-model="Add.di_name" placeholder="请输入车型">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addnew = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { validUsername } from '@/utils/validate'
    import { fetchDatatest } from '../../../api/index';
    export default {
        name: 'basetable',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('请输入4到12位字母或数字'))
                } else {
                    callback()
                }
            }
            return {
                query: {
                    di_name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addnew:false,
                pageTotal: 0,
                form: {},
                Add:{
                    di_name:"",
                },
                idx: -1,
                id: -1,
                options: [],
                rules:{
                    di_name:[{ required: true, trigger: 'blur', message:'请输入车辆类型'}],
                }
            };
        },
        created() {
            this.getData();
            this.getallrole();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                this.$axios.get('admin/Type/allcarTple').then(
                    response =>{
                        console.log(response.data.data);
                        this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                        this.pageTotal=response.data.count;
                    }
                )
            },
            // 获得所有角色
            getallrole(){
                this.$axios.get('admin/selectRole').then(
                    response =>{
                        console.log(this.info = response.data.data)
                        this.options=response.data.data
                    }
                )
            },
            // 触发搜索按钮
            handleSearch() {
                if(this.query.a_name!=''){
                    this.$axios.post(
                        'admin/Type/search',
                        {
                            di_name:this.query.di_name,
                        }
                    ).then(response=>{
                        if(response.data.code=='50001'){
                            this.$message.success('查找成功');
                            console.log(response.data.data);
                            this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                            this.pageTotal=response.data.count;
                        }}
                    )
                }else{
                    this.getData();
                    this.$message.error('输入不能为空');
                }
                // this.$set(this.query, 'pageIndex', 1);

            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios.post(
                            'admin/Type/del',
                            {
                                di_id:row.di_id,
                            }
                        ).then(response=>{
                            console.log(response.data);
                            if(response.data.code=='40001'){
                                this.$message.success('删除成功');
                                console.log(row);
                                this.tableData.splice(index, 1);
                                this.pageTotal-=1;
                            }}
                        )
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //添加操作
            AddType(){
                this.addnew=true;
            },
            //保存添加
            saveAdd(){
                this.$refs.add.validate(valid => {
                    if (valid) {
                        this.$axios.post('admin/Type/Add',
                            {
                                di_name:this.Add.di_name,
                            }
                        ).then(
                            response =>{
                                console.log(this.info = response.data)
                                if (response.data.code=='10001'){
                                    this.$message.success(response.data.msg);
                                    this.addnew = false;
                                    this.getData();
                                }else {
                                    this.$message.error(response.data.msg);
                                }
                            }
                        )
                    } else {
                        this.$message.error('输入不能为空');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
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
