export type CustomResponse = {
  statusCode: number
  message: string
  payload?: Record<string, any> | null
}

export type DeletedDocument = {
  acknowledged: boolean
  deletedCount: number
}

export type Slug = {
  name: string
}
