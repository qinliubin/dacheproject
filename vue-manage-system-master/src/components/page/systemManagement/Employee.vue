<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 员工管理
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
                <el-button type="primary" class="handle-del mr10" @click="AddEmployee">添加员工</el-button>
<!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
<!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
<!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
<!--                </el-select>-->
                <el-input v-model="query.a_name" placeholder="用户名" class="handle-input mr10"></el-input>
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
                <el-table-column prop="a_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="a_acc" label="账号"></el-table-column>
                <el-table-column prop="a_name" label="用户名"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.a_img"
                                :preview-src-list="[scope.row.a_img]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="r_name" label="角色"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.a_state==='使用'?'success':(scope.row.a_state!='使用'?'danger':'')"
                        >{{scope.row.a_state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="380" align="center">
                    <template slot-scope="scope">
                            <el-button
                                    v-if="scope.row.a_state=='使用'"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="locking(scope.$index, scope.row)"
                            >锁定</el-button>
                            <el-button
                                    v-else="scope.row.a_state!='使用'"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="Unlock(scope.$index, scope.row)"
                            >解锁</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户id" hidden>
                    <el-input v-model="form.a_id"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.a_name"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.r_id" class="handle-select mr10">
                        <el-option
                                v-for="item in options"
                                :key="item.r_id"
                                :label="item.r_name"
                                :value="item.r_id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 增加员工弹出框 -->
        <el-dialog title="编辑" :visible.sync="addnew" width="30%">
            <el-form :model="Add" :rules="rules" ref="addEmployee" label-width="70px">
                <el-form-item label="账号" prop="a_acc">
                    <el-input v-model="Add.a_acc" placeholder="请输入4到12位字母或数字">
                    </el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="Add.a_name"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="Add.a_role" class="handle-select mr10">
                        <el-option
                                v-for="item in options"
                                :key="item.r_id"
                                :label="item.r_name"
                                :value="item.r_id">
                        </el-option>
                    </el-select>
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
                    a_acc: '',
                    a_name: '',
                    a_state: '',
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
                    a_acc:'',
                    a_name:'',
                    a_role:2,
                },
                idx: -1,
                id: -1,
                options: [],
                rules:{
                    a_acc:[{ required: true, trigger: 'blur', validator: validateUsername }],
                    a_name:[{required: true, trigger: 'blur',}],
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
                // fetchDatatest(this.query).then(res => {
                //     console.log(res);
                //     console.log(this.query.pageIndex);
                //     console.log(this.query.pageIndex);
                //     console.log(this.query.pageSize);
                //     this.tableData = res.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                //     this.pageTotal = res.count || 10;
                // });
                this.$axios.get('admin/allAdmin').then(
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
                        'admin/Index/searchEmployee',
                        {
                            a_name:this.query.a_name,
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
                            'admin/Index/delEmployee',
                            {
                                a_id:row.a_id,
                            }
                        ).then(response=>{
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
            // 批量删除
            delAllSelection() {
                this.$axios.post(
                    'admin/Employee/allDelEmployee',
                    {
                        multipleSelection:this.multipleSelection
                    }
                ).then(response=>{
                    const length = this.multipleSelection.length;
                    let str = '';
                    this.delList = this.delList.concat(this.multipleSelection);
                    for (let i = 0; i < length; i++) {
                        str += this.multipleSelection[i].a_acc + ' ';
                    }
                    this.$message.error(`删除了${str}`);
                    this.multipleSelection = [];
                    this.$set(this.query, 'pageIndex', 1);
                    this.getData();
                })
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$axios.post(
                    'admin/Index/resetEmployee',
                    {
                        a_id:this.form.a_id,
                        a_name:this.form.a_name,
                        r_id:this.form.r_id,
                    }
                ).then(response=>{
                    if (response.data.code=='30001'){
                        this.$axios.post(
                            'admin/Index/getNowRole',
                            {
                                r_id:this.form.r_id,
                            }
                        ).then(response=>{
                            if (response.data.code=='20001'){
                                console.log(response.data.data.r_name)
                                this.form.r_name=response.data.data.r_name
                            }
                        })
                        this.$set(this.tableData, this.idx, this.form);
                        console.log(this.form);
                    }
                })


            },
            //添加操作
            AddEmployee(){
                this.addnew=true;
            },
            //保存添加
            saveAdd(){
                this.$refs.addEmployee.validate(valid => {
                    if (valid) {
                        // console.log(this.param.username);
                        // console.log(this.param.password);
                        this.$axios.post('admin/Index/AddEmployee',
                            {
                                a_acc:this.Add.a_acc,
                                a_name:this.Add.a_name,
                                r_id:this.Add.a_role,
                            }
                        ).then(
                            response =>{
                                console.log(this.info = response.data)
                                if (response.data.code=='10001'){
                                    this.$message.success(response.data.msg);
                                    this.addnew = false;
                                    this.getData();
                                }else {
                                    this.$message.error('账号存在');
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
            //锁定账户
            locking(index, row){
                this.form=row;
                console.log(this.form)
                this.$axios.post(
                    'admin/Employee/locking',
                    {
                        a_id:this.tableData[index].a_id,
                    }
                ).then(response=>{
                    if (response.data.code=='70001'){
                        this.form.a_state='锁定'
                        this.$message.success(response.data.msg);
                        this.$set(this.tableData, this.idx, this.form);
                    }
                })
            },
            //解锁账户
            Unlock(index, row){
                this.form=row;
                console.log(this.form)
                this.$axios.post(
                    'admin/Employee/Unlock',
                    {
                        a_id:this.tableData[index].a_id,
                    }
                ).then(response=>{
                    if (response.data.code=='70002'){
                        this.form.a_state='使用'
                        this.$message.success(response.data.msg);
                        this.$set(this.tableData, this.idx, this.form);
                    }
                })
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
