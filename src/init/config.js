/**
 * Initialize environment
 */

const config = {
  mongodb: {
    url: 'mongodb://admin:password@ds131583.mlab.com:31583/matcha',
  },
};

if (process.env.NODE_ENV !== 'production') {
  Object.assign(config, {});
}

/**
 * Interface
 */

export default config;
