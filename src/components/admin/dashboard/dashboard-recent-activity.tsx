/**
 * Dashboard Recent Activity - Display recent business activity
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for recent activity display
 * - OCP: Open for extension with new activity types
 * - ISP: Focused interface for activity functionality
 * - DIP: Depends on activity data abstractions
 *
 * Design Patterns:
 * - Component Pattern: Reusable activity component
 * - List Pattern: Displays collection of activities
 * - Strategy Pattern: Different activity display strategies
 *
 * Dependencies: i18n translations, shadcn/ui components
 */

'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn'
// Badge component will be implemented later - using span for now

interface ActivityItem {
  id: string
  type: 'order' | 'delivery' | 'invoice' | 'payment'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'warning' | 'error'
}

export function DashboardRecentActivity() {
  // Mock data - in real implementation, this would come from API
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'order',
      title: 'New Order #ORD-2024-001',
      description: 'Order received from customer',
      timestamp: '2 hours ago',
      status: 'pending',
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Delivery Completed #DEL-2024-045',
      description: 'Successfully delivered to customer',
      timestamp: '4 hours ago',
      status: 'success',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received #INV-2024-078',
      description: 'Invoice payment processed',
      timestamp: '6 hours ago',
      status: 'success',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates from your business operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'warning':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card">
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{activity.title}</h4>
          <span
            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}
          >
            {activity.status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
      </div>
    </div>
  )
}
