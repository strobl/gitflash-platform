
/**
 * Returns the correct path for redirection based on user role
 */
export function getRoleRedirectPath(role?: string | null): string {
  switch (role) {
    case 'user':
      return '/talent/startseite';
    case 'business':
      return '/unternehmen';  
    case 'operator':
      return '/dashboard';
    default:
      return '/login';  // Fallback to login if no role is defined
  }
}
