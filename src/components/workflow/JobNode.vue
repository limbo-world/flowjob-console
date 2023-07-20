<template>
<div class="node running">
    <img :src="logoPath" />
    <span class="label">{{ nodeStatus.label }}</span>
    <span class="status">
        <img :src="statusImage" />
    </span>
</div>
</template>
    
    
<script setup lang="ts">
import { ref, inject, computed, toRef } from "vue";
import { Node } from '@antv/x6';

const Images = {
    logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
    success: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
    failed: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
    running: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
}

const getGraph = inject('getGraph');
const getNode = inject('getNode') as () => Node;

interface NodeStatus {
    status: 'default' | 'success' | 'failed' | 'running'
    label?: string
}

const nodeStatus = computed(() => {
    const cnode = getNode() as Node;
    return cnode.getData() as NodeStatus;
});

const logoPath = ref(Images.logo);
const statusImage = computed(() => {
    const cnode = getNode() as Node;
    const cnodeStatus = cnode.getData() as NodeStatus;
    if (cnodeStatus.status === 'success') return Images.success;
    if (cnodeStatus.status === 'failed') return Images.failed;
    if (cnodeStatus.status === 'running') return Images.running;
    return "";
});
</script>
    

<style scoped lang="scss">
.node {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #c2c8d5;
    border-left: 4px solid #5F95FF;
    border-radius: 4px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
}
.node img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 8px;
}
.node .label {
    display: inline-block;
    flex-shrink: 0;
    width: 104px;
    margin-left: 8px;
    color: #666;
    font-size: 12px;
}
.node .status {
    flex-shrink: 0;
}
.node.success {
    border-left: 4px solid #52c41a;
}
.node.failed {
    border-left: 4px solid #ff4d4f;
}
.node.running .status img {
    animation: spin 1s linear infinite;
}
.x6-node-selected .node {
    border-color: #1890ff;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #d4e8fe;
}
.x6-node-selected .node.success {
    border-color: #52c41a;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #ccecc0;
}
.x6-node-selected .node.failed {
    border-color: #ff4d4f;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #fedcdc;
}
.x6-edge:hover path:nth-child(2){
    stroke: #1890ff;
    stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2){
    stroke: #1890ff;
    stroke-width: 1.5px !important;
}

@keyframes running-line {
    to {
        stroke-dashoffset: -1000;
    }
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>