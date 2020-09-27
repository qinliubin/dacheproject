<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单管理
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
                <el-select v-model="query.address" placeholder="用户昵称" class="handle-select mr10">
                    <el-option key="1" label="用户昵称" value="用户昵称"></el-option>
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
                <el-table-column prop="o_id" label="订单ID" width="68" align="center"></el-table-column>
                <el-table-column prop="d_name" label="司机昵称"></el-table-column>
                <el-table-column prop="rm_plateNumber" label="车牌"></el-table-column>
                <el-table-column prop="u_name" label="用户昵称"></el-table-column>
                <el-table-column prop="o_startTime" label="订单创建时间"></el-table-column>
                <el-table-column prop="o_endTime" label="订单结束时间"></el-table-column>
                <el-table-column prop="o_initiaPosition" label="起始位置"></el-table-column>
                <el-table-column prop="o_destination" label="目的地"></el-table-column>
                <el-table-column label="订单金额">
                    <template slot-scope="scope">￥{{scope.row.o_money}}</template>
                </el-table-column>
                <el-table-column prop="o_state" label="订单状态"></el-table-column>
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

<!--        &lt;!&ndash; 编辑弹出框 &ndash;&gt;-->
<!--        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">-->
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
    </div>
</template>

<script>
    import { fetchData } from '../../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData('admin/Order/Order');
        },
        methods: {
            // 获取订单数据
            getData(e) {
                this.$axios.post(
                    e
                ).then(response=>{
                    console.log(response.data);
                    this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                    this.pageTotal =response.data.count;
                })
            },
            // 触发搜索按钮
            handleSearch() {
                if (this.query.address=='用户昵称'&&this.query.name!=''){
                    this.$axios.post(
                        'admin/Order/CheckOrder',
                        {
                            u_name:this.query.name
                        }
                    ).then(response=>{
                        // console.log(response.data);
                        this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                        this.pageTotal =response.data.count;
                    })
                }else{
                    this.getData('admin/Order/Order');
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
                            'admin/Order/DelOrder',
                            {
                                o_id:this.tableData[index].o_id
                            }
                        ).then(response=>{
                            // console.log(response.data);
                            if (response.data.code=='50001'){
                                this.$message.success('删除成功');
                                this.getData('admin/Order/Order');
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
                    'admin/Order/allDelOrder',
                    {
                        multipleSelection:this.multipleSelection
                    }
                ).then(response=>{
                    // console.log(response.data)
                    this.$message.success(response.data.msg);
                    this.getData('admin/Order/Order');
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
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
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
