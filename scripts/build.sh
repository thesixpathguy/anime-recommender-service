echo "Starting the server..." 
npm run dev & > /dev/null 2>&1 
wait
if [[ -z $(sudo netstat -tulpn | grep :$portNum | grep node) ]] ; then 
    echo -e "\tPort $portNum is not in use, something went wrong. Exiting." 
else 
    echo -e "\tPort $portNum is in use!" 
fi