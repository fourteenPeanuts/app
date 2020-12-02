<template>
    <div style="height:400px;">
        <el-container>
            <el-main>
                <el-form ref="standardForm" :model="standardForm" label-width="80px" :rules="rules">
                    <el-form-item label="资源目录" v-if="standardForm.isPosted">
                        <el-select v-model="standardForm.resourceContents" placeholder="--请选择--" style="width: 100%;">
                            <el-option  :value="mineStatusValue" style="height: auto">
                                <el-tree :data="contentsItems" node-key="id" ref="tree" :props="defaultProps" @node-click="resourceHandleNodeClick" ></el-tree>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="编码" prop="code"><el-input v-model="standardForm.code"></el-input></el-form-item>
                    <el-form-item label="名称" prop="code"><el-input v-model="standardForm.name"></el-input></el-form-item>
                    <el-form-item label="描述">
                    <el-input type="textarea" v-model="standardForm.description"></el-input></el-form-item>
                    <el-form-item label="业务术语">
                        <div style="min-height: 40px;border-radius: 3%;border: 1px solid #dcdfe6;">
                            <el-tag v-for="tag in nomenclatureTags" :key="tag.key" closable :type="tag.type" size="mini" :disable-transitions="false" @close="closeTag(tag)">
                                {{tag.name}}
                            </el-tag>
                            <el-button slot="append" icon="el-icon-more" style="float:right;" @click="dialogVisible"></el-button>
                        </div>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="saveDataStandard">保存</el-button>
                        <el-button @click="cancelFun">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <el-dialog :visible.sync="isShowDialog" style="overflow: auto;" width="60%" title="选择业务术语" class="dialogViewClass" :modal="false">
            <modelnomenclatureview @chooseNomenclature="chooseNomenclature"></modelnomenclatureview>
        </el-dialog>
    </div>
</template>
<script>
    import modelnomenclatureview from '../dataelement/choose.nomenclature'
    export default {
        name: 'addstandarddata',
        components: { modelnomenclatureview },
        data() {
            return {
                nomenclatureTags: [],
                isShowDialog: false,
                mineStatusValue:'',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                rules: {
                    code: [
                        { required: true, message: '请输入编码', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                },
                contentsItems:[
                    {
                        label:'投资',
                        id:0
                    },
                    {
                        label:'基础',
                        id:1,
                        children: [
                            {
                                label:'宏观经济主题信息资源',
                                id:2
                            },
                            {
                                label:'法人单位基础信息资源',
                                id:3
                            },
                            {
                                label:'人口基础信息资源',
                                id:4
                            }
                        ]
                    },
                    {
                        label:'主题',
                        children: [
                            {
                                label:'投资主题库',
                                id:5
                            },
                            {
                                label:'多证合一主题信息资源',
                                id:6
                            }
                        ]
                    },
                    {
                        label:'部门',
                        children: [
                            {
                                label:'省审计厅',
                                id:7
                            },
                            {
                                label:'省教育厅',
                                id:8
                            }
                        ]
                    }
                ],
            }
        },
        props: {
            standardForm: {
                type: Object,
                default () {
                return {}
                }
            }
        },
        methods: {
            closeTag(tag) {
                this.nomenclatureTags.splice(this.nomenclatureTags.indexOf(tag), 1);
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

            cancelFun () {
                debugger
                this.$emit('cancelFun');
            },

            saveDataStandard () {
                debugger
                this.$emit('updateData',this.standardForm);
                this.$emit('cancelFun');
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },

            resourceHandleNodeClick(data) {
                this.mineStatusValue = data;
                this.standardForm.resourceContents = data.label;
            },

        }
}
</script>
<style scoped>
</style>