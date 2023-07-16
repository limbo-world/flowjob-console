<template>
<div :class="'node ' + nodeStatus.status">
    <img :src="logoPath" />
    <span class="label">{{ nodeStatus.label }}</span>
    <span class="status">
        <img :src="image" />
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
const image = computed(() => {
    const cnode = getNode() as Node;
    const cnodeStatus = cnode.getData() as NodeStatus;
    if (cnodeStatus.status === 'success') return Images.success;
    if (cnodeStatus.status === 'failed') return Images.failed;
    if (cnodeStatus.status === 'running') return Images.running;
    return Images.running;
});
</script>
