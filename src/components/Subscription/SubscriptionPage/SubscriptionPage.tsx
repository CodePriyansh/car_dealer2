import React from 'react';
import styles from './styles.module.css';

const PlanCard = ({ title, price, duration, features, popular, type }) => (
  <div className={`${styles.card} ${popular ? styles.cardPopular : ''}`}>
    <div className={`${styles.cardHeader} ${
      type === 'weekly' ? styles.cardHeaderWeekly : 
      type === 'popular' ? styles.cardHeaderPopular : 
      styles.cardHeaderPremium
    }`}>
      {/* {popular && <span className={styles.popularLabel}>Most Popular</span>} */}
      <h3 className={styles.planTitle}>{type}</h3>
    </div>
    <div className={styles.cardBody}>
      <p className={styles.price}>₹{price}</p>
      <p className={styles.duration}>{duration}</p>
      <h4 className={styles.featuresTitle}>What's Included:</h4>
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <svg className={styles.featureIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={styles.button}>
        Get Started
      </button>
    </div>
  </div>
);

const SubscriptionPage = () => {
  const plans = [
    {
      title: 'Starter Plan',
      price: '20.00',
      duration: 'This package validity is 24 Hours',
      features: [
        'Access basic features',
        'Console customization',
        'Share upto 5 guest',
        'Artificial Intelligence and ML',
      ],
      type: 'weekly',
    },
    {
      title: 'Basic Plan',
      price: '200.00',
      duration: 'This package validity is 1 Month',
      features: [
        'Access basic features',
        'Console customization',
        'Share upto 5 guest',
        'Artificial Intelligence and ML',
      ],
      popular: true,
      type: 'popular',
    },
    {
      title: 'Annual Plan',
      price: '2000.00',
      duration: 'This package validity is 12 Months',
      features: [
        'Access basic features',
        'Console customization',
        'Share upto 5 guest',
        'Artificial Intelligence and ML',
      ],
      type: 'premium',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>
          Subscribe for Exclusive Car Deals & Updates
        </h2>
        <div className={styles.cardWrapper}>
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;