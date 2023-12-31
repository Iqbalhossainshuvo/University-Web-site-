import { Schema, model } from 'mongoose';
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academicDepartment.interface';

const departmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const department = model<IAcademicDepartment, IAcademicDepartmentModel>(
  'department',
  departmentSchema
);


// export const department = model<IAcademicDepartment, IAcademicDepartmentModel>(
//   'department',
//   departmentSchema
// );
