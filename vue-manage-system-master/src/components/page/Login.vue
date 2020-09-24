<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { validUsername } from '@/utils/validate'
    import {validPassword} from '@/utils/validate'
    export default {
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('请按格式输入账号'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (!validPassword(value)) {
                    callback(new Error('输入至少四位数的密码'))
                } else {
                    callback()
                }
            }
            return {
                param: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                tableData:[]
            }
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        // console.log(this.param.username);
                        // console.log(this.param.password);
                        this.$axios.post('admin/login/login',
                           {
                                username:this.param.username,
                                password:this.param.password
                             }
                        ).then(
                            response =>{
                                // console.log(response.data)

                                // this.total=response.data.count
                                console.log(response.data.code);
                                if (response.data.code=='20001'){
                                    this.$message.success('登录成功');
                                    localStorage.setItem('ms_username', this.param.username);
                                    this.$router.push('/');
                                }else{
                                    this.$message.error('登录失败');
                                }
                            }
                        )
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    };
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #c9c4c4;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
