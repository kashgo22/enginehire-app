function success(data) {
  return { success: true, errors: null, data };
}

function mapLoginData(user) {
  return {
    success: true,
    errors: null,
    data: {
      token: user?.token,
      userId: user?.user_id,
      email: user?.email,
      isCandidate: user?.is_candidate,
      isEmployer: user?.is_employer,
      isAgent: user?.is_agent,
      agencyId: user?.agency_id,
      agencyOwner: user?.agency_owner,
      agency_list: user?.agency_list,
    },
  };
}

function mapUserData(user) {
  return {
    success: true,
    errors: null,
    data: {
      userId: user?.id,
      email: user?.email,
      firstName: user?.first_name,
      lastName: user?.last_name,
      phone: user?.phone,
      profilePic: user?.profile_pic,
      language: user?.language,
      agencyId: user?.agency_id,
      agencyOwner: user?.agency_owner,
      isCandidate: user?.is_candidate
    },
  };
}

function mapAgencyData(agency) {
  return {
    success: true,
    errors: null,
    data: {
      agencyId: agency?.id,
      name: agency?.name,
      humanName: agency?.human_name,
      manualClocking: agency?.manual_clocking,
    },
  };
}

function mapJobs(jobs) {
  return {
    success: true,
    errors: null,
    data: jobs.map(job => ({
      jobId: job?.id,
      agencyId: job?.agency,
      fillerId: job?.filler,
      fillerName: job?.filler_name,
      posterName: job?.poster_name,
      posterId: job?.poster,
      date: job?.date,
      endDate: job?.end_date,
      status: job?.status,
      notes: job?.text,
      candidateReviewed: job?.candidate_reviewed,
      startTime: job?.start_time,
      endTime: job?.end_time,
      actualStartDate: job?.actual_start_date,
      actualEndDate: job?.actual_end_date,
      actualStartTime: job?.actual_start_time,
      actualEndTime: job?.actual_end_time,
      clockInNotes: job?.clock_in_notes,
      clockOutNotes: job?.clock_out_notes,
      address1: job?.address1,
      city: job?.city,
      provinceState: job?.provincestate,
      postalCode: job?.postal_code,
      candidateRate: job?.candidate_rate,
    })
    ),
  };
}
export default {
  success,
  mapLoginData,
  mapUserData,
  mapJobs,
  mapAgencyData
};
