import PendingRequest, { PendingRequestProps } from "./PendingRequest";

export type PendingRequestsProps = {
    pendingRequests: PendingRequestProps[];
};

const PendingInvitations = ({ pendingRequests }: PendingRequestsProps) => {
    return (
        <>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {pendingRequests.map((pendingRequest) => {
                    return (
                        <div key={pendingRequest.id} className="col mb-3">
                            <PendingRequest
                                username={pendingRequest.username}
                                id={pendingRequest.id}
                                avatar={pendingRequest.avatar}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PendingInvitations;
