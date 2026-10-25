set -e
S=/tmp/claude-1000/-run-media-nz2xzhkzfeewkgbu-14A01EAFA01E9778-Users-dominik-Downloads-sieci-komputerowe/c523bc94-6fda-4faa-9298-30bc4924f3d9/scratchpad
A=$S/app; B=$S/build
SDK=/home/nz2xzhkzfeewkgbu/Android/Sdk; BT=$SDK/build-tools/36.0.0; AJ=$SDK/platforms/android-34/android.jar
G=$(echo /home/nz2xzhkzfeewkgbu/.gradle/wrapper/dists/gradle-9.3.1-bin/*/gradle-9.3.1/lib)
rm -rf $B; mkdir -p $B/classes $B/res
CP=$G/kotlin-compiler-embeddable-2.2.21.jar:$G/kotlin-stdlib-2.2.21.jar:$G/kotlin-script-runtime-2.2.21.jar:$G/kotlin-reflect-2.2.21.jar:$G/kotlin-daemon-embeddable-2.2.21.jar:$G/kotlinx-coroutines-core-jvm-1.10.2.jar:$G/annotations-24.0.1.jar
java -cp $CP org.jetbrains.kotlin.cli.jvm.K2JVMCompiler -no-stdlib -no-reflect -jvm-target 11 -cp $AJ:$G/kotlin-stdlib-2.2.21.jar -d $B/classes $A/src 2>&1 | grep -v "^warning" || true
$BT/aapt2 compile --dir $A/res -o $B/res.zip
$BT/aapt2 link -I $AJ --manifest $A/AndroidManifest.xml --min-sdk-version 24 --target-sdk-version 34 --version-code 1 --version-name 1.0 -A $A/assets -o $B/base.apk $B/res.zip
$BT/d8 --lib $AJ --min-api 24 --output $B $(find $B/classes -name '*.class') $G/kotlin-stdlib-2.2.21.jar
(cd $B && zip -q base.apk classes.dex)
$BT/zipalign -f 4 $B/base.apk $B/aligned.apk
KS=$S/debug.keystore
[ -f $KS ] || keytool -genkeypair -keystore $KS -storepass android -keypass android -alias k -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Quiz" >/dev/null 2>&1
$BT/apksigner sign --ks $KS --ks-pass pass:android --key-pass pass:android --out $B/quiz.apk $B/aligned.apk
ls -la $B/quiz.apk
