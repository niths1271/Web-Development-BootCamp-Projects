// C++++ program to find winner in an election.
#include "bits/stdc++.h"
using namespace std;

	 void findWinner(vector<string> arr)
    {
        map<string,int> map;
        for(int i=0;i<arr.size();i++)
         map[arr[i]]++;
        string ans;
        int max=map[arr[0]];
        for(auto i=map.begin();i!=map.end();i++){
            if(i->second>max)
            {
                 cout<<ans<<" "<<max<<endl;
                ans=i->first;
                max=i->second;
            }
        }
        cout<<max;
		cout << ans << endl;
	}

	// Driver code
	int main()
	{
	vector<string> votes = { "john", "johnny", "jackie",
						"johnny", "john", "jackie",
						"jamie", "jamie", "john",
						"johnny", "jamie", "johnny",
						"john" };

	findWinner(votes);
	return 0;
	}