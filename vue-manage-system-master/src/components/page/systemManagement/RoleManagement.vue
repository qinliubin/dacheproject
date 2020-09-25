<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-button-->
<!--                        type="primary"-->
<!--                        icon="el-icon-delete"-->
<!--                        class="handle-del mr10"-->
<!--                        @click="delAllSelection"-->
<!--                >批量删除</el-button>-->
                <el-button type="primary" class="handle-del mr10" @click="AddRole">添加角色</el-button>
<!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
<!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
<!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
<!--                </el-select>-->
                <el-input v-model="query.r_name" placeholder="角色名" class="handle-input mr10"></el-input>
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
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column prop="r_id" label="ID" width="60" align="center"></el-table-column>
                <el-table-column prop="r_name" label="角色名"></el-table-column>
                <el-table-column prop="r_depict" label="角色描述"></el-table-column>
                <el-table-column label="操作" width="380" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleuplimit(scope.$index, scope.row)"
                        >修改权限</el-button>
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
                <el-form-item label="角色名">
                    <el-input v-model="form.r_name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="form.r_depict"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改权限弹出框 -->
        <el-dialog title="修改权限" :visible.sync="uplimitVisible" width="50%">
            <div class="drag-box">
                <div class="drag-box-item">
                    <div class="item-title">未拥有的权限</div>
                    <draggable v-model="alllimit" :options="dragOptions">
                        <transition-group tag="div" id="todo" class="item-ul">
                            <div v-for="item in alllimit" class="drag-list" :key="item.au_id">
                                {{item.au_content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <div class="drag-box-item">
                    <div class="item-title">拥有权限</div>
                    <draggable v-model="nowlimit" :options="dragOptions">
                        <transition-group tag="div" id="doing" class="item-ul">
                            <div v-for="item in nowlimit" class="drag-list" :key="item.au_id">
                                {{item.au_content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="savelimit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 增加角色弹出框 -->
        <el-dialog title="编辑" :visible.sync="addnew" width="30%">
            <el-form :model="Add" :rules="rules"  ref="addRole" label-width="70px">
                <el-form-item label="角色名" prop="r_name">
                    <el-input v-model="Add.r_name" placeholder="请输入新的角色名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="r_depict">
                    <el-input v-model="Add.r_depict" placeholder="请输入新增加的角色描述"></el-input>
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
    import draggable from 'vuedraggable'
    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    r_depict: '',
                    r_name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addnew:false,
                uplimitVisible:false,
                pageTotal: 0,
                form: {},
                Add:{
                    r_name:'',
                    r_depict:'',
                },
                idx: -1,
                id: -1,
                dragOptions:{
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
                rules:{
                    r_name:[{ required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 7, message: '长度在 2 到 7个字符', trigger: 'blur' }],
                    r_depict:[{ required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15个字符', trigger: 'blur' }],
                },
                alllimit: [],
                nowlimit: [],
            };
        },
        created() {
            this.getData();
        },
        components:{
            draggable
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                console.log("111");
                this.$axios.get('admin/allRole').then(
                    response =>{
                        console.log(this.info = response.data)
                       this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                        this.pageTotal=response.data.count
                    }
                )
            },
            getlimit(rid){
                let username = localStorage.getItem('ms_username');
                this.$axios.post(
                    'admin/RoleManagement/getnowlimt',
                    {
                        r_id:rid,
                    }
                ).then(
                    response =>{
                        console.log(response.data.data);//用户拥有的权限
                        console.log( response.data.data1);//所有权限
                        this.oldlimit=response.data.data;
                        for(var i=0;i<response.data.data1.length;i++){
                            for(var j=0;j<response.data.data.length;j++){
                                if(response.data.data1[i].au_id==response.data.data[j].au_id){
                                    // console.log(response.data.data1[i].au_id);
                                    response.data.data1.splice(i,1);
                                }
                            }
                        }
                        this.alllimit=response.data.data1;
                        this.nowlimit=response.data.data;
                        console.log(this.alllimit);//用户没有的权限
                        console.log(this.nowlimit);//所有权限
                    }
                )
            },
            // 触发搜索按钮
            handleSearch() {
                if(this.query.r_name!=''){
                    this.$axios.post(
                        'admin/RoleManagement/searchRole',
                        {
                            r_name:this.query.r_name,
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
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios.post(
                            'admin/RoleManagement/delRole',
                            {
                                r_id:row.r_id,
                            }
                        ).then(response=>{
                            if(response.data.code=='40001'){
                                this.$message.success('删除成功');
                                console.log(row);
                                this.tableData.splice(index, 1);
                                this.pageTotal-=1;
                            }else if(response.data.code=='40002'){
                                this.$message.error(response.data.msg);
                            }
                        }
                        )
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 修改权限操作
            handleuplimit(index, row) {
                this.idx = index;
                this.form = row;
                this.uplimitVisible = true;
                this.getlimit(row.r_id);
            },
            //保存权限修改
            savelimit(){
                this.$axios.post(
                    'admin/RoleManagement/uplimit',
                    {
                        r_id:this.form.r_id,
                        nowlimit:this.nowlimit,
                    }
                ).then(
                    response =>{
                        console.log(response.data);
                        if(response.data.code=='30001'){
                            this.uplimitVisible = false;
                            this.$message.success(response.data.msg);
                        }
                    }
                )

            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$axios.post(
                    'admin/RoleManagement/resetRole',
                    {
                        r_id:this.form.r_id,
                        r_name:this.form.r_name,
                        r_depict:this.form.r_depict,
                    }
                ).then(response=>{
                    if (response.data.code=='30001'){
                        console.log(response.data.data.r_name)
                        this.$set(this.tableData, this.idx, this.form);
                        console.log(this.form);
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    }
                })
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            // // 拖拽移动
            // removeHandle(event){
            //     console.log(this.nowlimit);
            //     console.log(this.alllimit);
            //     console.log(event);
            //     this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
            // },
            // // 拖拽移动（删除）
            // removedel(event){
            //     console.log(this.nowlimit);
            //     console.log(this.alllimit);
            //     this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
            // },
            //添加操作
            AddRole(){
                this.addnew=true;
            },
            //保存添加
            saveAdd(){
                this.$refs.addRole.validate(valid => {
                    if (valid) {
                        // console.log(this.param.username);
                        // console.log(this.param.password);
                        this.$axios.post('admin/RoleManagement/AddRole',
                            {
                                r_name:this.Add.r_name,
                                r_depict:this.Add.r_depict,
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
    /*拖拽的样式*/
    .drag-box{
        display: flex;
        user-select: none;
    }
    .drag-box-item {
        flex: 1;
        max-width: 330px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }
    .item-title{
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }
    .item-ul{
        padding: 0 8px 8px;
        height: 500px;
        overflow-y: scroll;
    }
    .item-ul::-webkit-scrollbar{
        width: 0;
    }
    .drag-list {
        border: 1px #e1e4e8 solid;
        padding: 10px;
        margin: 5px 0 10px;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
    }
    .drag-list:hover {
        border: 1px solid #20a0ff;
    }
</style>
