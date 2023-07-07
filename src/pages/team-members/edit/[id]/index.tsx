import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTeamMemberById, updateTeamMemberById } from 'apiSdk/team-members';
import { Error } from 'components/error';
import { teamMemberValidationSchema } from 'validationSchema/team-members';
import { TeamMemberInterface } from 'interfaces/team-member';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { AgencyInterface } from 'interfaces/agency';
import { getAgencies } from 'apiSdk/agencies';

function TeamMemberEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TeamMemberInterface>(
    () => (id ? `/team-members/${id}` : null),
    () => getTeamMemberById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TeamMemberInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTeamMemberById(id, values);
      mutate(updated);
      resetForm();
      router.push('/team-members');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TeamMemberInterface>({
    initialValues: data,
    validationSchema: teamMemberValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Team Member
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="role" mb="4" isInvalid={!!formik.errors?.role}>
              <FormLabel>Role</FormLabel>
              <Input type="text" name="role" value={formik.values?.role} onChange={formik.handleChange} />
              {formik.errors.role && <FormErrorMessage>{formik.errors?.role}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<AgencyInterface>
              formik={formik}
              name={'agency_id'}
              label={'Select Agency'}
              placeholder={'Select Agency'}
              fetcher={getAgencies}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'team_member',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TeamMemberEditPage);
