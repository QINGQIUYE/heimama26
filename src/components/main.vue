<template>
    <div>
        main <el-button type="danger" @click="logoinOut" round>危险按钮</el-button>
    </div>
</template>
<script>
export default {
    beforeCreate() {
        let token=window.sessionStorage.getItem("token");
        if (token) {
            
        }else{
            this.$message.error('兄弟你还没有登录')
              this.$router.push('login')
        }
    },
    methods: {
        logoinOut(){
            window.sessionStorage.removeItem('token')
            this.$router.push('login')
        }
    },
}
</script>
<style lang="sass">

</style>
