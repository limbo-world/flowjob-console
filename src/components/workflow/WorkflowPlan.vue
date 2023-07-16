<template>
    <div :id="x6ContainerId" class="workflow-x6-container">
    </div>
</template>


<script setup lang="ts">
import { computed, onMounted, Ref, ref, toRef } from "vue";
import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { useX6Graph } from "@/components/workflow/X6GraphIntergration";
import { Cell } from "@antv/x6";
import { Node } from "@antv/x6/lib/model";


const props = defineProps<{
    plan: PlanDTO
}>();

const plan: Ref<PlanDTO> = toRef(props, 'plan');
const x6ContainerId = computed<string>(() => 'x6Container_' + plan.value?.planId);
const { x6Graph } = useX6Graph(x6ContainerId.value);

onMounted(() => {
    // 初始化作业节点
    const jobNodeMetas: Node.Metadata[] = [];
    const jobNodeMetaMap: Map<String, Node.Metadata> = new Map();

    // 先生成节点
    plan.value?.workflow?.forEach((job: WorkflowJobDTO) => {
        const jobNodeMeta = {
            "id": job.id,
            "shape": "dag-node",
            "x": 290,
            "y": 110,
            "data": {
                "label": job.name,
                "status": "success"
            },
            "ports": [ ]
        };
        jobNodeMetas.push(jobNodeMeta);
        jobNodeMetaMap.set(job.id, jobNodeMeta);
    });
    // 再生成连线
    plan.value?.workflow?.forEach((job: WorkflowJobDTO) => {
        if (job?.children?.length && job?.children?.length <= 0) {
            return;
        }

        let jobNodeMeta = jobNodeMetaMap.get(job.id);
        if (!jobNodeMeta) {
            return;
        }

        job.children?.forEach((childJobId: string) => {
            jobNodeMeta?.ports?.push({
                id: `${job.id}-${childJobId}`,
                group: 'right'
            });

            const childJobNodeMeta = jobNodeMetaMap.get(childJobId);
            childJobNodeMeta?.ports.push({
                id: `${job.id}-${childJobId}`,
                group: 'right'
            });
        });
    });

    //
    const cells: Cell[] = [];
    x6Graph.value?.resetCells(cells);
})

</script>


<style scoped lang="scss">
.workflow-x6-container {
    width: 100%;
    height: 100%;
}
</style>