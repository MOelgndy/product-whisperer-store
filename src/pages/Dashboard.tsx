
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, DollarSign, Package, Activity, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { cartItems } = useCart();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and monitor performance</p>
          </div>
          
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/import">Import New Products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/import?tab=export">
                <FileText className="mr-2 h-4 w-4" />
                Export Products
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">12 from Amazon, 20 from Alibaba</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,231.89</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+15% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.3%</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>-2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 font-medium border-b">
                <div>Order</div>
                <div>Customer</div>
                <div>Status</div>
                <div>Date</div>
                <div>Total</div>
              </div>
              
              <div className="divide-y">
                {[
                  { id: '#ORD-7291', customer: 'John Smith', status: 'Completed', date: '2025-04-29', total: '$129.99' },
                  { id: '#ORD-7290', customer: 'Emily Johnson', status: 'Processing', date: '2025-04-28', total: '$89.50' },
                  { id: '#ORD-7289', customer: 'Michael Brown', status: 'Shipped', date: '2025-04-27', total: '$245.00' },
                  { id: '#ORD-7288', customer: 'Sarah Davis', status: 'Completed', date: '2025-04-26', total: '$52.30' },
                  { id: '#ORD-7287', customer: 'Robert Wilson', status: 'Cancelled', date: '2025-04-25', total: '$199.99' }
                ].map(order => (
                  <div key={order.id} className="grid grid-cols-5 p-4 items-center">
                    <div className="font-medium">{order.id}</div>
                    <div>{order.customer}</div>
                    <div>
                      <Badge variant={
                        order.status === 'Completed' ? 'default' :
                        order.status === 'Processing' ? 'outline' :
                        order.status === 'Shipped' ? 'secondary' :
                        'destructive'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{order.date}</div>
                    <div>{order.total}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center py-6">
          <p className="text-amber-600">
            The dashboard features require Supabase integration for full functionality.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
