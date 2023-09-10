export interface IProjects {
  projectTitle: string
  clientName: {
    firstName: string
    lastName: string
  }
  category: string[]
  date: Date
  projectMainImage: string
  projectImage1?: string
  projectImage2?: string
  projectImage3?: string
  projectImage4?: string
  description: string
  liveLink?: string
}
