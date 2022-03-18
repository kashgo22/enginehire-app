function success(data) {
  return { success: true, errors: null, data };
}

function mapLoginData(user) {
  return {
    success: true,
    errors: null,
    data: {
      token: user.token,
      userId: user.user_id,
      email: user.email,
      isCandidate: user.is_candidate,
      isEmployer: user.is_employer,
      isAgent: user.is_agent,
      agencyId: user.agency_id,
      agencyOwner: user.agency_owner,
    },
  };
}

function mapUserData(user) {
  return {
    success: true,
    errors: null,
    data: {
      userId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      profilePic: user.profile_pic,
      language: user.language,
      agencyId: user.agency_id,
      agencyOwner: user.agency_owner,
    },
  };
}

function mapJobs(jobs) {
  return {
    success: true,
    errors: null,
    data: jobs.map(job => ({
      jobId: job.id,
      posterName: job.poster_name,
      startDate: job.date,
      endDate: job.end_date,
      status: job.status,
      notes: job.text,
      candidateReviewed: job.candidate_reviewed,
      startTime: job.start_time,
      endTime: job.end_time,
      actualStartTime: job.actual_start_time,
      actualEndTime: job.actual_end_time,
      clockInNotes: job.clock_in_notes,
      clockOutNotes: job.clock_out_notes
    })
    ),
  };
}
export default {
  success,
  mapLoginData,
  mapUserData,
  mapJobs,
};
