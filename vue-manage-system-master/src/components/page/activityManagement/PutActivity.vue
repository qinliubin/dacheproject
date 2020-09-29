<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 活动管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>活动发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" style="display: inline-block">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="活动主题" prop="name">
                        <el-input v-model="form.name" required="required"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" prop="starttime">
                        <el-col :span="11">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="form.starttime"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="活动结束时间" prop="endtime">
                        <el-col :span="11">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="form.endtime"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <div class="crop-demo">
                            <div class="crop-demo-btn">选择图片
                                <div class="imag">
                                    <img :src="cropImg" class="pre-img">
                                </div>
                                <input class="crop-input" ref="inputfile" type="file" name="image" accept="image/*" @change="setImage"/>
                            </div>
                        </div>
                    </el-form-item>
                    <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                        <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                        <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
                    </el-dialog>
                    <el-form-item label="活动折扣">
                        <el-input v-model="form.discounts" required="required"></el-input>
                    </el-form-item>
                    <el-form-item label="活动优惠的价格">
                        <el-input v-model="form.cutmoney" required="required"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import VueCropper from "vue-cropperjs";
    // import {validname} from '@/utils/validate';
    // import {validname} from '@/utils/validate';

    export default {
        name: 'baseform',
        data() {
            return {
                defaultSrc: require('../../../assets/img/YuLan.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                File: {},
                dialogVisible: false,
                form: {
                    name: '',
                    starttime: '',
                    endtime:'',
                    filename:'',
                    desc: ''
                },
                rules:{
                    name:[{required:true,trigger:'blur',message:'请输入活动主题'}],
                    starttime:[{required:true,trigger:'blur',}],
                    endtime:[{required:true,trigger:'blur',}],
                }
            };
        },
        components: {
            VueCropper
        },
        methods: {
            setImage(e){
                const file = e.target.files[0];
                this.File=file;
                if (!file.type.includes('image/')) {
                    return;
                }
                this.form.filename=file.name;
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            },
            onSubmit() {
                if (this.form.name!=''&&this.form.date1!=''&&this.form.filename!=''&&this.form.desc!=''){
                    const formFile = new FormData();
                    formFile.append('n_img',this.File);
                    formFile.append('n_title',this.form.name);
                    formFile.append('n_time',this.form.date1);
                    formFile.append('n_content',this.form.desc);
                    const data=formFile;
                    this.$axios.post(
                        'admin/PressReleases/Press',
                        data
                    ).then(response=>{
                        // console.log(response.data);
                        this.$message.success(response.data.msg);
                    })
                }else {
                    this.$message.error('不能有空');
                }
            }
        },
        created(){
            this.cropImg = this.defaultSrc;
        }
    };
</script>
<style>
    .imag{
        height: 150px;
        width: 150px;
        /*display: inline-block;*/
    }
    .imag img{
        height: 100%;
        width: 100%;
    }
</style>
