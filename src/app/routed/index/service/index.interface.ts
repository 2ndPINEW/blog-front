export interface BlogListData {
  contents: IndexData[]
}

export interface IndexData {
  date: string
  description: string
  icon: string
  tags: string[]
  title: string
  path: string
}