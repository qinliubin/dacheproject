<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 新闻管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>新闻</el-breadcrumb-item>
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
                <el-select v-model="query.address" placeholder="新闻标题" class="handle-select mr10">
                    <el-option key="1" label="新闻标题" value="新闻标题"></el-option>
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
                <el-table-column prop="n_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="n_title" label="标题"></el-table-column>
                <el-table-column prop="n_time" label="时间"></el-table-column>
                <el-table-column prop="n_content" label="内容"></el-table-column>
                <el-table-column label="新闻图片(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.n_img"
                                :preview-src-list="[scope.row.n_img]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
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
        <!-- 编辑新闻弹出框 -->
        <el-dialog title="添加" :visible.sync="edble" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="form.n_title"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-col :span="11">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.n_time"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                        ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" rows="5" v-model="form.n_content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="edble = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'news',
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
                update:'',
                editVisible: false,
                edble:false,
                pageTotal: 0,
                form: {
                    n_title:'',
                    n_content:'',
                    n_time:'',
                },
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData('admin/ManagementNews/Viewnews');
        },
        methods: {
            // 获取新闻信息
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
                if (this.query.address=='新闻标题'&&this.query.name!=''){
                    this.$axios.post(
                        'admin/ManagementNews/Checknews',
                        {
                            n_title:this.query.name
                        }
                    ).then(response=>{
                        console.log(response.data);
                        this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                        this.pageTotal =response.data.count;
                    })
                }else{
                    this.getData('admin/ManagementNews/Viewnews');
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
                            'admin/ManagementNews/Delnews',
                            {
                                n_id:this.tableData[index].n_id
                            }
                        ).then(response=>{
                            console.log(response.data);
                            if (response.data.code=='50001'){
                                this.$message.success('删除成功');
                                this.getData('admin/ManagementNews/Viewnews');
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
                    'admin/ManagementNews/allDelnews',
                    {
                        multipleSelection:this.multipleSelection
                    }
                ).then(response=>{
                    console.log(response.data)
                    this.$message.success(response.data.msg);
                    this.getData('admin/ManagementNews/Viewnews');
                })
            },
            // 编辑新闻
            handleEdit(index, row) {
                this.edble=true;
                this.update=this.tableData[index].n_id;
            },
            // 保存编辑
            saveEdit() {
                if (this.form.n_title!=''&&this.form.n_content!=''&&this.form.n_time!=''){
                    this.$axios.post(
                        'admin/ManagementNews/editnuws',
                        {
                            n_id:this.update,
                            n_title:this.form.n_title,
                            n_content:this.form.n_content,
                            n_time:this.form.n_time
                        }
                    ).then(response=>{
                        console.log(response.data)
                        if (response.data.code=='60001'){
                            this.edble=false;
                            this.$message.success(response.data.msg);
                            this.getData('admin/ManagementNews/Viewnews');
                        }
                    })
                }else{
                    this.$message.error('不能有任何输入框为空');
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
        width: 100%;
        height: 100%;
    }
</style>
