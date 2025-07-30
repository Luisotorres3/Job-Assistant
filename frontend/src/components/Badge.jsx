import React from 'react';

const badgeVariants = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  destructive: "border-transparent bg-destructive text-destructive-foreground",
  outline: "text-foreground",
};

const statusVariants = {
    applied: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    interview: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800",
    offer: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800",
}

function Badge({ className, variant = 'default', status, ...props }) {
  const variantClass = status ? statusVariants[status] : badgeVariants[variant];
  return (
    <div
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClass} ${className}`}
      {...props}
    />
  );
}

export default Badge;
