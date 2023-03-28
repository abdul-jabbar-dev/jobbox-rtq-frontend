import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useJobQuery } from "../redux/features/api/api.slice";
import Loading from "../components/reusable/Loading";

const Jobs = () => {
  const jobQuery = useJobQuery()
  console.log()
  let content = ''
  if (jobQuery?.isLoading) {
    content = <Loading></Loading>

  } else if (jobQuery?.data?.length === 0) {
    content = <div>'No Job found'</div>
  } else if (jobQuery?.isSuccess) {
    content = jobQuery?.data?.map((singleJob, i) => <JobCard key={i} jobData={singleJob} />)
  }
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {
          content
        }
      </div>
    </div>
  );
};

export default Jobs;
