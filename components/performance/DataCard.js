import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";


const DataCard = ({ value, label, shouldFormat }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-lg font-bold">
                    {shouldFormat ? formatPrice(value) : value}
                </div>
            </CardContent>
        </Card>
    );
};

export default DataCard;
