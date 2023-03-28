import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { ThreeDots } from 'react-loader-spinner'
import Loading from "../components/reusable/Loading";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAddQusMutation, useApplyMutation, useJobByIdQuery, useSendReplayMutation } from "../redux/features/api/api.slice";



const JobDetails = () => {
  const { id } = useParams()
  const { data, isLoading } = useJobByIdQuery(id)
  const user = useSelector(state => state.authentiaction.user)
  const [sendqns, { isLoading: qnsLoading }] = useAddQusMutation()
  const [makeApplyJob] = useApplyMutation()
  const [sendReplay] = useSendReplayMutation()
  const [newReply, setNewReply] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

  const applyJob = () => {
    if (!user._id) {
      return navigate('/register')
    }
    const appliedJobInfo = {
      candidateId: user?._id,
      candidateEmail: user?.email,
      jobCircular: id
    }

    makeApplyJob(appliedJobInfo)
  }
  const sendNotification = (data) => {
    const sendMassage = {
      massage: data.questionbox,
      candidateId: user._id,
      circularId: id
    }
    sendqns(sendMassage)
    reset()
  }
  const sendReply = (massageId) => {

    const replayData = {
      massage: newReply,
      circularId: id,
      massageId
    }
    sendReplay(replayData);
  }
  return (
    <div>
      {
        isLoading ? <Loading></Loading> : <div className='pt-14 grid grid-cols-12 gap-5'>
          <div className='col-span-9 mb-10'>
            <div className='h-80 rounded-xl overflow-hidden'>
              <img className='h-full w-full object-cover' src={meeting} alt='' />
            </div>
            <div className='space-y-5'>
              <div className='flex justify-between items-center mt-5'>
                <h1 className='text-xl font-semibold text-primary'>{data?.position}</h1>
                {
                  user.role && <button onClick={applyJob} className='btn'>Apply</button>
                }

              </div>
              <div>
                <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
                <p>{data?.overview}</p>
              </div>
              <div>
                <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
                <ul>
                  {data?.skills?.map((skill, i) => (
                    <li key={i} className='flex items-center'>
                      <BsArrowRightShort /> <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className='text-primary text-lg font-medium mb-3'>
                  Requirements
                </h1>
                <ul>
                  {data?.requirements?.map((skill, i) => (
                    <li key={i} className='flex items-center'>
                      <BsArrowRightShort /> <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className='text-primary text-lg font-medium mb-3'>
                  Responsibilities
                </h1>
                <ul>
                  {data?.responsibilities?.map((skill, i) => (
                    <li key={i} className='flex items-center'>
                      <BsArrowRightShort /> <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr className='my-5' />
            <div>
              <div>
                <h1 className='text-xl font-semibold text-primary mb-5'>
                  General Q&A
                </h1>
                <div className='text-primary my-2'>


                  {data?.qus?.map(({ massage, email, reply, massageId }, i) => (
                    <div key={i}>
                      <small>{email}</small>
                      <p className='text-lg font-medium'>{massage}</p>
                    { user?.role ==="employer"  &&  <div className='flex gap-3 my-5'>
                        <input onBlur={e => setNewReply(e.target.value)} placeholder='Reply' type='text' className='w-full' />
                        <button
                          className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                          type='button'
                          onClick={e => sendReply(massageId)}
                        >

                          <BsArrowRightShort size={30} />
                        </button>
                      </div>}
                      {reply?.map((item, i) => (

                        <p key={i} className='flex items-center  gap-2 relative left-5'>
                          <BsArrowReturnRight /> {item}
                        </p>

                      ))}

                    </div>
                  ))}
                </div>
                {
                  user?.role === "candidate" && <form onSubmit={handleSubmit(sendNotification)}>
                    <div className='flex gap-3 my-5'>
                      <input
                        placeholder='Ask a question...'
                        type='text'
                        className='w-full'
                        {...register('questionbox')}
                      />
                      <button
                        className='shrink-0 h-14 w-14  flex bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all   place-items-center text-primary hover:text-white'
                        type='submit'
                      >
                        {qnsLoading ? <ThreeDots
                          width="60%"
                          radius="9"
                          color="blue"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{ "justifyContent": "center" }}
                          visible={true}
                        /> : <BsArrowRightShort style={{ "justifyContent": "center", marginLeft: '12px' }} size={30} />}

                      </button>
                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
          <div className='col-span-3'>
            <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
              <div>
                <p>Experience</p>
                <h1 className='font-semibold text-lg'>{data?.experience}</h1>
              </div>
              <div>
                <p>Work Level</p>
                <h1 className='font-semibold text-lg'>{data?.workLevel}</h1>
              </div>
              <div>
                <p>Employment Type</p>
                <h1 className='font-semibold text-lg'>{data?.employmentType}</h1>
              </div>
              <div>
                <p>Salary Range</p>
                <h1 className='font-semibold text-lg'>{data?.salaryRange}</h1>
              </div>
              <div>
                <p>Location</p>
                <h1 className='font-semibold text-lg'>{data?.location}</h1>
              </div>
            </div>
            <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
              <div>
                <h1 className='font-semibold text-lg'>{data?.companyName}</h1>
              </div>
              <div>
                <p>Company Size</p>
                <h1 className='font-semibold text-lg'>Above 100</h1>
              </div>
              <div>
                <p>Founded</p>
                <h1 className='font-semibold text-lg'>2001</h1>
              </div>
              <div>
                <p>Email</p>
                <h1 className='font-semibold text-lg'>company.email@name.com</h1>
              </div>
              <div>
                <p>Company Location</p>
                <h1 className='font-semibold text-lg'>Los Angeles</h1>
              </div>
              <div>
                <p>Website</p>
                <a className='font-semibold text-lg' href='#'>
                  https://website.com
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default JobDetails;
