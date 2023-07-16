<template>
    <div className="node {{ status }}">
        <img :src="logoPath" />
        <span className="label">{{ label }}</span>
        <span className="status">
            <img :src="image" />
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Node } from '@antv/x6';

const Images = {
    logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
    success: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
    failed: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
    running: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
}

export default defineComponent({
    name: "DagNode",
    inject: ["getNode"],
    data() {
        return {
            label: "",
            status: "",
            image: Images.running,
            logoPath: Images.logo
        };
    },
    mounted() {
        const node = (this as any).getNode() as Node;
        node.on("change:data", ({ current }) => {
            this.status = current.status;
            this.label = current.label;
            if (this.status === 'success') this.image = Images.success;
            if (this.status === 'failed') this.image = Images.failed;
            if (this.status === 'running') this.image = Images.running;
        });
    },
});
</script>
  