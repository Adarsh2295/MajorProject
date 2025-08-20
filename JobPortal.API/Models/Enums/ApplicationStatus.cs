namespace JobPortal.API.Models.Enums
{
    public enum ApplicationStatus
    {
        Applied,
        UnderReview,
        InterviewScheduled,
        Rejected,
        Hired,
        Accepted,     // Job seeker accepted the offer
        OfferRejected // Job seeker rejected the offer
    }
}
