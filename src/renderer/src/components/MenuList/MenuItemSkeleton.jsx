import { Box, Card, CardActions, CardContent, CardHeader, Skeleton } from "@mui/material";

export default function MenuItemSkeleton() {

    return (
        <Card className="menuItem" sx={{boxShadow: 0}}>
            <CardHeader 
                sx={{textAlign: 'center'}}
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }} />
                }
                subheader={
                    <Skeleton 
                        animation="wave" 
                        height={10} width="40%" />
                } />
            <CardContent sx={{p: 0}}>
                <Skeleton 
                    height={210} 
                    animation="wave" 
                    variant="rectangular" />
            </CardContent>
            <CardActions sx={{p: 2}}>
                <Box className="MenuButtonWrap">
                    <Skeleton variant="rounded" 
                        width={89} height={36} 
                        animation="wave"
                        sx={{display: "inline-block", marginRight: '.75rem'}} />
                    <Skeleton variant="rounded" 
                        width={89} height={36} 
                        animation="wave"
                        sx={{display: "inline-block"}} />
                </Box>
            </CardActions>
        </Card>
    )
}