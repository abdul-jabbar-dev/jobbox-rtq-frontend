import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useAppliedJobsQuery } from "../../redux/features/api/api.slice";


const AppliedJobs = () => {
  const {
    user,
  } = useSelector((state) => state.authentiaction);

  const { data, isLoading } = useAppliedJobsQuery(user.email);

  if (isLoading) {
    return <Loading />;
  }
  console.log(data)

  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {data?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
