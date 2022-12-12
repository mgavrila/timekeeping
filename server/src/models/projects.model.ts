import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the User class to be used as TypeScript type
export class Projects {
  @prop()
  name: string
}

// Create the user model from the User class
const projectsModel = getModelForClass<typeof Projects>(Projects)
export default projectsModel
