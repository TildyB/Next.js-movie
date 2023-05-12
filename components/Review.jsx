import styles from './Review.module.css'
const Review = ({review}) => {
    return ( 
        <div className={styles.revCard}>
            <h5>{review.reviewer}</h5>
            <p>{review.text}</p>
        </div>
     );
}
 
export default Review