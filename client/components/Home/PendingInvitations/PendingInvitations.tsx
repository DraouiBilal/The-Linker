import PendingInvitation, { PendingInvitationProps } from "./PendingInvitation";

export type PendingInvitationsProps = {
    pendingInvitations: PendingInvitationProps[];
};

const PendingInvitations = ({
    pendingInvitations,
}: PendingInvitationsProps) => {
    return (
        <>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {pendingInvitations.map((pendingInvitations) => {
                    return (
                        <div key={pendingInvitations.id} className="col mb-3">
                            <PendingInvitation
                                username={pendingInvitations.username}
                                id={pendingInvitations.id}
                                avatar={pendingInvitations.avatar}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PendingInvitations;
