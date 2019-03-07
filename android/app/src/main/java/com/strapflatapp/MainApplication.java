package com.strapflatapp;

import android.annotation.SuppressLint;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.RNFirebasePackage;


import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @SuppressLint("MissingPermission")
        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
<<<<<<< HEAD
           
                     new ImagePickerPackage(),
                        new RNGoogleSigninPackage(),
=======
                    new ImagePickerPackage(),
                    new RNGoogleSigninPackage(),
>>>>>>> 17ebdf9c36fc60e3c1c0c95fba1f64aad350b9e5
                    new RNFirebasePackage(),
                    new VectorIconsPackage(),
                    new RNFirebaseAuthPackage(),
                    new RNFirebaseFirestorePackage(),
<<<<<<< HEAD
                     new RNFirebaseStoragePackage() 
                    
=======
                    new RNFirebaseStoragePackage()
>>>>>>> 17ebdf9c36fc60e3c1c0c95fba1f64aad350b9e5
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
