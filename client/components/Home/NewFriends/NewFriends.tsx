import Friend, { FriendProps } from "./Friends";

export type newFriendsProps = {
    newFriends: FriendProps[];
};
const NewFriends = ({ newFriends }: newFriendsProps) => {
    return (
        <>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {newFriends.map((friend) => {
                    return (
                        <div key={friend.id} className="col mb-3">
                            <Friend
                                username={friend.username}
                                id={friend.id}
                                avatar={friend.avatar}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default NewFriends;
