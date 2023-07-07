import * as yup from 'yup';

export const technologyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  agency_id: yup.string().nullable(),
});
