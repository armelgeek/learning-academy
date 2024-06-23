const CommentItem = ({  comment }) => {
    return (
        <div className="w-full ">
            <div className="font-semibold">
                {comment.userId}:
            </div>
            <div key={comment.id}>
                {comment.content}
            </div>
        </div>
    );
}
export default CommentItem;
