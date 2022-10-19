export interface BlogPageData {
  html: string,
  metaData: MetaData
}

export interface BlogListData {
  contents: MetaData[]
}

export interface MetaData {
  date: string
  description: string
  icon: string
  tags: string[]
  title: string
  path: string
}