<template>
    <el-form-item label="调度周期">
        <el-date-picker v-model="scheduleRange" :disabled="disabled"
            type="datetimerange" range-separator="To" value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择"  start-placeholder="请选择开始时间" end-placeholder="请选择结束时间" />
    </el-form-item>

    <el-form-item label="延迟时间(毫秒)">
        <el-input-number v-model="option.scheduleDelay" :min="0" controls-position="right" :disabled="disabled" />
    </el-form-item>

    <el-form-item label="调度方式">
        <el-radio-group v-model="option.scheduleType"
            class="ml-4" :disabled="disabled">
            <el-radio v-for="item in ScheduleTypeEnum.getArr()" :key="item.value" :label="item.value">
                {{ item.label }}
            </el-radio>
        </el-radio-group>
    </el-form-item>

    <template
        v-if="ScheduleTypeEnum.FIXED_RATE.value === option.scheduleType || ScheduleTypeEnum.FIXED_DELAY.value === option.scheduleType">
        <el-form-item label="调度间隔(毫秒)">
            <el-input-number v-model="option.scheduleInterval" :min="0" controls-position="right" :disabled="disabled" />
        </el-form-item>
    </template>

    <template v-if="ScheduleTypeEnum.CRON.value === option.scheduleType">
        <el-form-item label="CRON表达式类型">
            <el-radio-group v-model="option.scheduleCronType" class="ml-4" :disabled="disabled">
                <el-radio v-for="item in CRONTypeEnum.getArr()" :key="item.value" :label="item.value">
                    {{ item.label }}
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="CRON表达式">
            <el-input v-model="option.scheduleCron" :disabled="disabled" />
        </el-form-item>
    </template>

</template>

<script setup lang="ts">
// 参考 https://blog.csdn.net/Miketutu/article/details/130686380
import { CRONTypeEnum, ScheduleTypeEnum } from '@/types/console-enums';
import { ScheduleOptionDTO } from '@/types/swagger-ts-api';
import { computed, Ref, ref, toRef, watch } from "vue";

const props = defineProps<{
    option: ScheduleOptionDTO,
    disabled: boolean
}>();

// v-model:option
const option: Ref<ScheduleOptionDTO> = toRef(props, 'option');
const emitOptionUpdate = defineEmits<{(
    e: 'update:option',
    val: ScheduleOptionDTO
): void}>();
watch(option, (newValue) => {
    if (newValue) {
        emitOptionUpdate('update:option', newValue);
    }
    scheduleRange.value = [option.value.scheduleStartAt, option.value.scheduleEndAt];

}, { deep: true })

// 调度周期
// const scheduleRange = computed(() => [option.value.scheduleStartAt, option.value.scheduleEndAt]);
const scheduleRange = ref<[string, string]>(['', '']);
watch(scheduleRange, (newValue) => {
    if (newValue) {
        option.value.scheduleStartAt = newValue[0];
        option.value.scheduleEndAt = newValue[1];
    } else {
        option.value.scheduleStartAt = '';
        option.value.scheduleEndAt = '';
    }
}, { deep: true })


</script>
