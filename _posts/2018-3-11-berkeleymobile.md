---
layout: post
title: Updates to Berkeley Mobile
headline: When I first joined in Fall 2017, I was shocked that there was no documentation for Berkeley Mobile. All that existed was a tiny README that had instructions on how to run a single JUnit test. Due to this lack of coordination among previous developers, much gets lost in between ideation and the actual product that is pushed out. My first couple weeks on the team, I took it upon myself to completely read through the codebase, and understand Berkeley Mobile Android's architecture and general dataflow.
---

<p class="message">
Berkeley Mobile 8.1 is now available on the Google Play Store <a href="https://play.google.com/store/apps/details?id=com.asuc.asucmobile&hl=en">here</a>! A lot went into redesign, streamlining, and standardization of some of the things we do.
</p>

One of the biggest problems we face in Berkeley Mobile, or I guess any long-term software project run by the ASUC, is that students come and go. Old members graduate or get too busy, and new members are brought on-board semesterly. Because of this, you can imagine that the codebase gets pretty messy.

When I first joined in Fall 2017, I was shocked that there was no documentation for Berkeley Mobile. All that existed was a tiny README that had instructions on how to run a single JUnit test. Due to this lack of coordination among previous developers, much gets lost in between ideation and the actual product that is pushed out. My first couple weeks on the team, I took it upon myself to completely read through the codebase, and understand Berkeley Mobile Android's architecture and general dataflow.

<p class="message">
Being a seasoned software developer, I advocate for expressing more with less code, and in general being more effective with everyone's time.
</p>

The last sprint I led, I worked on cleaning up how our mobile clients fetch data from our back end. Teams from previous semesters/years before I joined had been fetching data in different ways, and only touched files in which their features lived. Lack of coordination led to half our data being fetched with pure `okhttp`, and half of it with `retrofit`. Both ways had these HUGE hundred-line methods in their data controllers that parsed JSON. Seemed like a huge waste of code, screen real estate, and time.

With a bit of POJO and `gson` magic, I converted this...

```java
  new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    for (int i = 0; i < array.length(); i++) {
                        JSONObject libraryJSON = array.getJSONObject(i);
                        int id = libraryJSON.getInt("id");
                        String name = libraryJSON.getString("name");
                        String location = libraryJSON.getString("campus_location");
                        String phone = libraryJSON.getString("phone_number");
                        long tmpDate;
                        Date opening;
                        Date closing;
                        JSONArray weeklyOpenArray =
                                libraryJSON.getJSONArray("weekly_opening_times");
                        JSONArray weeklyCloseArray =
                                libraryJSON.getJSONArray("weekly_closing_times");
                        String openingString;
                        String closingString;
                        Date[] weeklyOpen = new Date[7];
                        Date[] weeklyClose = new Date[7];
                        for (int j=0; j < weeklyOpenArray.length(); j++) {
                            openingString = weeklyOpenArray.getString(j);
                            opening = null;
                            if (!openingString.equals("null")) {
                                tmpDate = DATE_FORMAT.parse(openingString).getTime();
                                opening = new Date(tmpDate + PST.getOffset(tmpDate));
                            }
                            weeklyOpen[j] = opening;
                        }
                        for (int j=0; j < weeklyCloseArray.length(); j++) {
                            closingString = weeklyCloseArray.getString(j);
                            closing = null;
                            if (!closingString.equals("null")) {
                                tmpDate = DATE_FORMAT.parse(closingString).getTime();
                                closing = new Date(tmpDate + PST.getOffset(tmpDate));
                            }
                            weeklyClose[j] = closing;
                        }
                        double lat;
                        double lng;
                        if (!libraryJSON.getString("latitude").equals("null") &&
                                !libraryJSON.getString("longitude").equals("null")) {
                            lat = libraryJSON.getDouble("latitude");
                            lng = libraryJSON.getDouble("longitude");
                        } else {
                            lat = Library.INVALID_COORD;
                            lng = Library.INVALID_COORD;
                        }
                        JSONArray weeklyAppointmentArray =
                                libraryJSON.getJSONArray("weekly_by_appointment");
                        boolean[] weeklyAppointments = new boolean[7];
                        for (int j=0; j < weeklyAppointmentArray.length(); j++) {
                            weeklyAppointments[j] = weeklyAppointmentArray.getBoolean(j);
                        }
                        boolean byAppointment = weeklyAppointments[0];
                        Calendar c = Calendar.getInstance();
                        Date d = DATE_FORMAT.parse(libraryJSON.getString("updated_at"));
                        c.setTime(d);
                        int weekday = c.get(Calendar.DAY_OF_WEEK);
                        libraries.add(new Library(id, name, location, phone, weeklyOpen[0],
                                weeklyClose[0], weeklyOpen, weeklyClose, lat, lng, byAppointment,
                                weeklyAppointments, weekday));
                    }

                    // Sort the libraries alphabetically, putting favorites at top
                    Collections.sort(libraries, CustomComparators.FacilityComparators.getSortByFavoriteLibrary(context));
                    ((Activity) context).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            callback.onDataRetrieved(libraries);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    ((Activity) context).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            callback.onRetrievalFailed();
                        }
                    });
                }
            }
        }).start();
```

...into this:



```java
  BMRetrofitController.bmapi.callLibrariesList().enqueue(new retrofit2.Callback<LibrariesResponse>() {
            @Override
            public void onResponse(Call<LibrariesResponse> call, Response<LibrariesResponse> response) {
                mAdapter.setList(response.body().getLibraries());
            }

            @Override
            public void onFailure(Call<LibrariesResponse> call, Throwable t) {
                Toast.makeText(getContext(), "Unable to retrieve data, please try again",
                        Toast.LENGTH_SHORT).show();
            }
        });
```

And the first code block didn't even include the network call! With the magic of predefined data models and `SerializedName` annotations, the entire first block can be written as so from the second block: `mDiningHallList = (List<FoodPlace>) response.body().getDiningHalls();`. And instead of having to write huge JSON parsers for every single endpoint that we call, we can just leverage the power of `okhttp`, `retrofit`, and `gson` working in harmony.

And everything is summarized nicely in a collection of internal documentation, so that future developers and codebase maintainers don't have to rewrite a tool that has already been written, or have to go through the pains of reading through every line of code to make sure it actually does what it does. Hoping my little time investment saves future teams' time, so that they can continue to make innovate and integrate new, awesome features without having to spend most of their time looking back. I know that my team has.
