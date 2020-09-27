<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 收费管理
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
                <el-select v-model="selectvalueCar" placeholder="车辆类型" class="handle-select mr10" @change="search">
                    <el-option
                            v-for="item in optionsCar"
                            :key="item.di_id"
                            :label="item.di_name"
                            :value="item.di_id">
                    </el-option>
                </el-select>
                <el-select v-model="selectvalueType" placeholder="车型" class="handle-select mr10" @change="search">
                    <el-option
                            v-for="item in optionsType"
                            :key="item.bi_id"
                            :label="item.bi_type"
                            :value="item.bi_type">
                    </el-option>
                </el-select>
                <el-select v-model="selectvalueWeather" placeholder="天气" class="handle-select mr10" @change="search">
                    <el-option
                            v-for="item in optionsWeather"
                            :key="item.bi_id"
                            :label="item.bi_weather"
                            :value="item.bi_weather">
                    </el-option>
                </el-select>
                <el-select v-model="selectvalueGaofeng" placeholder="是否高峰" class="handle-select mr10" @change="search">
                    <el-option
                            v-for="item in optionsGaofeng"
                            :key="item.bi_id"
                            :label="item.bi_fastigium"
                            :value="item.bi_fastigium">
                    </el-option>
                </el-select>
<!--                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>-->
                <el-button type="primary" icon="el-icon-search" @click="all">查看全部</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >
                <!--                <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="bi_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="di_name" label="车辆类型" align="center">
                </el-table-column>
                <el-table-column prop="bi_type" label="车型" align="center">
                </el-table-column>
                <el-table-column prop="bi_weather" label="天气" align="center">
                </el-table-column>
                <el-table-column prop="bi_fastigium" label="高峰时段" align="center">
                </el-table-column>
                <el-table-column prop="bi_startKilometre" label="起步公里" align="center">
                </el-table-column>
                <el-table-column prop="bi_flag" label="起步价" align="center">
                    <template slot-scope="scope">￥{{scope.row.bi_flag}}</template>
                </el-table-column>
                <el-table-column label="超公里数单价" align="center">
                    <template slot-scope="scope">￥{{scope.row.bi_money}}</template>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :rules="rules" ref="edit" :model="form" label-width="70px">
                <el-form-item label="起步公里" prop="bi_flag">
                    <el-input v-model.number="form.bi_startKilometre"></el-input>
                </el-form-item>
                <el-form-item label="起步价（元）" prop="bi_flag">
                    <el-input v-model.number="form.bi_flag"></el-input>
                </el-form-item>
                <el-form-item label="超公里数单价（元）" prop="bi_money">
                    <el-input v-model.number="form.bi_money"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    bi_flag: '',
                    bi_money: '',
                    bi_weather: '',
                    bi_fastigium: '',
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
                id: -1,
                rules:{
                    bi_flag:[{ required: true, message: '价格不能为空'},
                        { type: 'number', message: '价格必须为数字值'}],
                    bi_money:[{required: true, message: '价格不能为空'},
                        { type: 'number', message: '价格必须为数字值'}],
                    bi_startKilometre:[{required: true, message: '起步公里不能为空'},
                        { type: 'number', message: '价格必须为数字值'}],
                },
                selectvalueCar:'',
                optionsCar: [],
                selectvalueType:'',
                optionsType:[],
                selectvalueWeather:'',
                optionsWeather:[],
                selectvalueGaofeng:'',
                optionsGaofeng:[],
            };
        },
        created() {
            this.getData();
            this.getselect();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                this.$axios.get('admin/ChargesManagement/allcharges').then(
                    response =>{
                        console.log(response.data.data);
                        this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                        this.pageTotal=response.data.count;
                    }
                )
            },
            getselect(){
                this.$axios.get('admin/ChargesManagement/allselect').then(
                    response =>{
                        console.log(response.data);
                        this.optionsCar=response.data.data;
                        this.optionsType=response.data.data1;
                        this.optionsWeather=response.data.data2;
                        this.optionsGaofeng=response.data.data3;
                    }
                )
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
                console.log(this.form);
            },
            // 保存编辑
            saveEdit() {
                this.$refs.edit.validate(valid => {
                    if (valid) {
                        console.log(this.form)
                        this.$axios.post('admin/ChargesManagement/resetCharges',
                            {
                                bi_flag:this.form.bi_flag,
                                bi_money:this.form.bi_money,
                                bi_startKilometre:this.form.bi_startKilometre,
                                bi_id:this.form.bi_id,
                            }
                        ).then(
                            response =>{
                                console.log(this.info = response.data)
                                if (response.data.code=='30001'){
                                    this.editVisible = false;
                                    this.$message.success(`修改成功`);
                                    this.$set(this.tableData, this.idx, this.form);
                                }else {
                                    this.$message.error('修改失败');
                                }
                            }
                        )
                    } else {
                        this.$message.error(`请输入正确的价格`);
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
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios.post(
                            'admin/ChargesManagement/del',
                            {
                                bi_id:row.bi_id,
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
            // 搜索
            search(){
                console.log(this.selectvalueCar);
                console.log(this.selectvalueType);
                console.log(this.selectvalueWeather);
                console.log(this.selectvalueGaofeng);
                this.$axios.post(
                    'admin/ChargesManagement/search',
                    {
                        selectvalueCar:this.selectvalueCar,
                        selectvalueType:this.selectvalueType,
                        selectvalueWeather:this.selectvalueWeather,
                        selectvalueGaofeng:this.selectvalueGaofeng
                    }
                ).then(response=>{
                        console.log(response.data.data);
                        this.tableData=response.data.data.slice((this.query.pageIndex-1)*this.query.pageSize,this.query.pageIndex*this.query.pageSize);
                        this.pageTotal=response.data.count;
                }
                )
            },
            //查看全部计费规则
            all(){
                this.selectvalueCar='';
                this.selectvalueType='';
                this.selectvalueWeather='';
                this.selectvalueGaofeng='';
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
