import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import type { Ref } from '@typegoose/typegoose'
import { User } from './user.model'
import { Projects } from './projects.model'

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the Teams class to be used as TypeScript type
export class Teams {
  @prop()
  name: string

  @prop({ ref: () => Projects })
  project: Ref<Projects>

  @prop({ ref: () => User })
  members: Ref<User>[]
}

// Create the user model from the User class
const teamsModel = getModelForClass<typeof Teams>(Teams)
export default teamsModel
