<template>
    <el-container style="width: 100%;height: 100%;background-color: #f8f8f9;" v-if="isShowCard">
        <el-main style="overflow: hidden;">
            <div style="width: 100%;height:1%;padding-left: 30px;padding-bottom: 10px;">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/criterion/dataelementlist' }">数据元</el-breadcrumb-item>
                    <el-breadcrumb-item>新增数据元</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="background-color: #ffffff;width: 100%;height: 100%;">
                <el-scrollbar style="height:100%;width: 100%;">
                    <el-form :model="form" size="mini" status-icon :rules="rules" ref="form" label-width="8%" class="demo-form" style=" padding-top: 20px;">
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="编码" prop="elementCode">
                                    <el-input v-model='form.elementCode' placeholder="请输入编码"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="中文名称" prop="elementName">
                                    <el-input v-model='form.elementName' placeholder="请输入中文名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="描述">
                                    <el-input v-model='form.describe' type="textarea" :autosize="{ minRows: 6}" placeholder="请输入描述信息"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="字段名称" prop="fieldName">
                                    <el-input v-model='form.fieldName' placeholder="请输入字段名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="英文名称">
                                    <el-input v-model='form.englishName' placeholder="请输入英文名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="数据类型" prop="dataType">
                                    <el-select v-model="form.dataType" size="mini" style="width: 100%;">
                                        <el-option v-for="item in typeItems" :key="item.typeValue" :label="item.typeLabel" :value="item.typeValue"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="长度">
                                    <el-col :span="11">
                                        <el-input v-model='form.minDataLength' placeholder="请输入最小长度"></el-input>
                                    </el-col>
                                    <el-col class="line" :span="2" style="text-align:center">至</el-col>
                                    <el-col :span="11">
                                        <el-input v-model='form.maxDataLength' placeholder="请输入最大长度"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="值域" size="mini">
                                    <el-select placeholder="--请选择--" style="width: 100%;" v-model='form.range'>
                                        <el-option v-for="item in rangeItems" :key="item.rangeValue" :label="item.rangeLabel" :value="item.rangeValue"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="必填">
                                    <el-switch v-model="form.delivery"></el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="标准来源" prop="describle">
                                    <el-input v-model='form.standardSource' type="textarea" :autosize="{ minRows: 6}" placeholder="请输入标准来源"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="国家数据元标识符">
                                    <el-input v-model='form.nationalLogo' placeholder="请输入国家数据元标识符"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="2">
                                <el-form-item label="业务术语">
                                    <div style="min-height: 28px;border-radius: 5%;border: 1px solid #dcdfe6;">
                                        <el-tag v-for="tag in nomenclatureTags" :key="tag.key" closable :type="tag.type" size="mini" :disable-transitions="false" @close="closeTag(tag)">
                                            {{tag.name}}
                                        </el-tag>
                                        <el-button slot="append" icon="el-icon-more" style="float:right;" @click="dialogVisible"></el-button>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="12">
                                <el-form-item>
                                    <el-button type="primary" @click="saveDataElement">保存</el-button>
                                    <el-button @click="cancelFun">取消</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-scrollbar>
            </div>

            <el-dialog :visible.sync="isShowDialog" style="overflow: auto;" width="60%" title="选择业务术语" class="dialogViewClass" :modal="false">
                <modelnomenclatureview @chooseNomenclature="chooseNomenclature"></modelnomenclatureview>
            </el-dialog>

        </el-main>
    </el-container>
</template>
<script>
    import modelnomenclatureview from './choose.nomenclature'
    export default {
        name: 'addelementlist',
        components: { modelnomenclatureview },
        data () {
            return {
                input2:'',
                isShowDialog: false,
                nomenclatureTags: [],
                isShowCard:false,
                rules: {
                    elementCode: [
                        { required: true, message: '请输入编码', trigger: 'blur' }
                    ],
                    elementName: [
                        { required: true, message: '请输入中文名称', trigger: 'blur' }
                    ],
                    fieldName: [
                        { required: true, message: '请输入字段名称', trigger: 'blur' }
                    ],
                    dataType: [
                        { required: true, message: '请选择数据类型', trigger: 'blur' }
                    ],
                },
                isdrawer:false,
                form: {
                    elementCode: '',//编码
                    elementName: '',//中文名称
                    describe: '',//描述
                    fieldName: '',//字段名称
                    englishName: '',//英文名称
                    dataType: '字符型',//数据类型
                    minDataLength: '',//最小长度
                    maxDataLength: '',//最大长度
                    range: '',//值域
                    delivery: false,
                    standardSource: '',//标准来源
                    nationalLogo: '',//国家数据元标识符
                    nomenclature: '',//业务术语
                    isPosted:'',
                },
                rangeItems: [
                    {
                        rangeLabel: '家族关系代码',
                        rangeValue: '0'
                    },
                    {
                        rangeLabel: '有无情况代码',
                        rangeValue: '1'
                    },
                    {
                        rangeLabel: '治疗类别代码',
                        rangeValue: '2'
                    },
                    {
                        rangeLabel: '药品性质',
                        rangeValue: '3'
                    },
                    {
                        rangeLabel: '手术级别代码',
                        rangeValue: '4'
                    },
                    {
                        rangeLabel: '诊断类型代码',
                        rangeValue: '5'
                    },
                    {
                        rangeLabel: '注册号',
                        rangeValue: '6'
                    },
                    {
                        rangeLabel: 'ABO血型代码表',
                        rangeValue: '7'
                    },
                    {
                        rangeLabel: '药物剂型代码表',
                        rangeValue: '8'
                    },
                    {
                        rangeLabel: '世界各国和地区名称代码',
                        rangeValue: '9'
                    },
                    {
                        rangeLabel: '处方类别代码',
                        rangeValue: '10'
                    },
                    {
                        rangeLabel: '联系电话类别代码',
                        rangeValue: '11'
                    }
                ],
                typeItems: [
                    {
                        typeLabel: '字符型',
                        typeValue: '0'
                    },
                    {
                        typeLabel: '数值型',
                        typeValue: '1'
                    },
                    {
                        typeLabel: '日期型',
                        typeValue: '2'
                    },
                    {
                        typeLabel: '逻辑型',
                        typeValue: '3'
                    },
                    {
                        typeLabel: '二进制型',
                        typeValue: '4'
                    },
                    {
                        typeLabel: '长文本型',
                        typeValue: '5'
                    }
                ],
            }
        },
        mounted () {
            this.init();
            this.isdrawer = this.$route.query.isdrawer?this.$route.query.isdrawer:false;
        },
        methods: {
            init () {
                if(this.$route.query && this.$route.query.form && this.$route.query.form.elementName){
                    this.form = this.$route.query.form;
                }
                this.isShowCard = true;
            },

            closeTag(tag) {
                this.nomenclatureTags.splice(this.nomenclatureTags.indexOf(tag), 1);
            },

            chooseNomenclature(dataRow) {
                var obj = {name:dataRow.name,type:'info',key:dataRow.name};
                var nomeclatureList = this.nomenclatureTags;
                var isPush = true;
                if(nomeclatureList.length > 0){
                    for(var i = 0; i < nomeclatureList.length; i++){
                        if(nomeclatureList[i].name === dataRow.name){
                            isPush = false;
                    }
                    }
                    if(isPush){
                        this.nomenclatureTags.push(obj);
                    }
                }else{
                    this.nomenclatureTags.push(obj);
                }
                this.isShowDialog = false;
            },

            dialogVisible () {
                if(this.nomenclatureTags.length < 5){
                    this.isShowDialog = true;
                }else{
                    this.$message({
                        message: '警告，最多配置5个业务术语',
                        type: 'warning'
                    });
                }
            },

            /*保存*/
            saveDataElement () {
                debugger
                this.$router.push({
                    path: '/criterion',
                    name:'dataelementlist',
                    params :{
                         elementForm:this.form,
                        operationType:this.$route.query.operationType,
                        tableData:this.$route.query.tableData,
                    }
                });
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },

            /*取消*/
            cancelFun (item) {
                this.$router.push({
                    path: '/criterion',
                    name:'dataelementlist',
                    params: {
                        operationType:this.$route.query.operationType,
                        tableData:this.$route.query.tableData,
                    }
                });
            },
        }
    }
</script>
<style scoped>
    
</style>
<style>
    .dialogViewClass .el-dialog__body {
        padding: 0 20px;
    }
    .dialogViewClass .el-dialog__header {
        padding-top: 20px;
        padding-left: 20px;
        background-color: #f8f8f9;
    }
    *::-webkit-scrollbar {
        width: 4px;
        height: 0px;
        border: 0;
    }
    *::-webkit-scrollbar-button {
        display: none;
    }
    *::-webkit-scrollbar-track {
        background: transparent;
    }
    *::-webkit-scrollbar-thumb {
        background: rgb(197, 196, 196);
    }
    *::-webkit-scrollbar-corner {
        background: transparent;
    }
</style>