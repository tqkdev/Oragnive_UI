import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<FontAwesomeIcon key={i} icon={solidStar} style={{ color: '#fc0', marginRight: '3px' }} />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<FontAwesomeIcon key={i} icon={halfStar} style={{ color: '#fc0', marginRight: '3px' }} />);
        } else {
            stars.push(<FontAwesomeIcon key={i} icon={solidStar} style={{ color: '#ccc', marginRight: '3px' }} />);
        }
    }

    return (
        <div>
            <span>{stars}</span>
        </div>
    );
};

export default RatingStars;
