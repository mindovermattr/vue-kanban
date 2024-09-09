import { EKanbanCategory } from '@/types/EKanbanCategory'
import { EStatus } from '@/types/EStatus'
import type { TKanbanItems } from '@/types/TKanban'
import { reactive } from 'vue'

export const kanbanCards: TKanbanItems = reactive({
  noStatus: [
    {
      id: 1,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Web,
      status: EStatus.NoStatus,
    },
    {
      id: 2,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Web,
      status: EStatus.NoStatus,
    },
  ],
  needDone: [
    {
      id: 3,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Research,
      status: EStatus.NeedDone,
    },
    {
      id: 4,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Research,
      status: EStatus.NeedDone,
    },
  ],
  inProgress: [
    {
      id: 5,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Web,
      status: EStatus.InProgress,
    },
    {
      id: 6,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Web,
      status: EStatus.InProgress,
    },
  ],
  testing: [
    {
      id: 7,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Web,
      status: EStatus.Testing,
    },
    {
      id: 8,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Web,
      status: EStatus.Testing,
    },
  ],

  done: [
    {
      id: 9,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Copywriting,
      status: EStatus.Done,
    },
    {
      id: 10,
      title: 'Какая-то задача',
      date: '12.12.2022',
      category: EKanbanCategory.Copywriting,
      status: EStatus.Done,
    },
  ],
})
