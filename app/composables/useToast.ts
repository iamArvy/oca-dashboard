// composables/useToast.ts
import { toast } from 'vue-sonner'

export function useToast() {
  const success = (message: string, description?: string) => {
    toast.success(message, {
      description,
      style: { borderColor: 'green', color: 'green' },
    })
  }

  const error = (message: string, description?: string) => {
    toast.error(message, {
      description,
      style: { borderColor: 'red', color: 'red' },
    })
  }

  const info = (message: string, description?: string) => {
    toast(message, {
      description,
      style: { borderColor: 'blue', color: 'blue' },
    })
  }

  return { success, error, info }
}