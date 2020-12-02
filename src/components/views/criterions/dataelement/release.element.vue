<template>
    <div style="margin-top: 20px;">
        <el-form ref="dataElementForm" :model="dataElementForm" label-width="100px">
            <el-form-item label="资源目录">
                <el-select v-model="dataElementForm.resourceContents" placeholder="--请选择--" style="width: 100%;">
                    <el-option  :value="mineStatusValue" style="height: auto">
                        <el-tree :data="contentsItems" node-key="id" ref="tree" :props="defaultProps" @node-click="resourceHandleNodeClick" ></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资源编码">
                <el-input v-model="dataElementForm.resourceCode"></el-input>
            </el-form-item>
            <el-form-item label="资源名称">
                <el-input v-model="dataElementForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="资源摘要">
                <el-input type="textarea" v-model="dataElementForm.resourceDescription"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-select v-model="dataElementForm.resourceLabel" placeholder="--请选择--" style="width: 100%;">
                    <el-option  :value="mineStatusValue" style="height: auto">
                        <el-tree :data="resourceLabelItems" node-key="id" ref="tree" :props="defaultProps" ></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
           <el-form-item style="text-align: center;padding-bottom: 20px;">
                <el-button type="primary" @click="releaseDataElement()">保存</el-button>
                <el-button @click="canclePublish">取消</el-button>
           </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'releaseelement',
        data () {
            return {
                mineStatusValue:'',
                resourceLabelItems:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
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
            dataElementForm: {
                type: Object,
                default () {
                return {}
                }
            },
            releaseElementObject:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        mounted () {
        },
        methods: {
            resourceHandleNodeClick(data) {
                this.mineStatusValue = data;
                this.dataElementForm.resourceContents = data.label;
            },

            releaseDataElement(){
                this.$emit("isNotDisplayDialog",false);
                this.$emit("isNotDisplayDrawer",false);
                this.releaseElementObject.isPosted = 'true';
                this.releaseElementObject.code = this.dataElementForm.resourceCode;
                this.releaseElementObject.name = this.dataElementForm.resourceName;
                this.releaseElementObject.description = this.dataElementForm.resourceDescription;
                this.releaseElementObject.resourceContents = this.dataElementForm.resourceContents;
                this.releaseElementObject.resourceLabel = this.dataElementForm.resourceLabel;
                this.$emit("updateData",this.releaseElementObject);
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },

            canclePublish(){
                debugger
                this.$emit("isNotDisplayDialog",false);
            }
        }
    }
</script>
<style scoped>
</style>