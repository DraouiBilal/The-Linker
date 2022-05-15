import YourFriend, { YourFriendProps } from "./YourFriend";

export type YourFriendsProps = {
    yourFriends: YourFriendProps[];
};

const PendingInvitations = ({ yourFriends }: YourFriendsProps) => {
    return (
        <>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {yourFriends.map((yourFriend) => {
                    return (
                        <div key={yourFriend.id} className="col mb-3">
                            <YourFriend
                                username={yourFriend.username}
                                id={yourFriend.id}
                                avatar={yourFriend.avatar}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PendingInvitations;
